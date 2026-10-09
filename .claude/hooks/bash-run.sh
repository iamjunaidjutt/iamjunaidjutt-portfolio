#!/usr/bin/env bash
# Hook to filter noisy command output and keep only meaningful lines

# Read the command from stdin
read -r command

# Detect noisy commands that should be filtered
case "$command" in
  # Package manager installs
  *"npm install"*|*"npm i"*|*"pnpm install"*|*"pnpm i"*|*"yarn install"*|*"yarn add"*|*"bun install"*)
    filter_mode="install"
    ;;
  # Build commands
  *"npm run build"*|*"pnpm build"*|*"yarn build"*|*"bun build"*|*"next build"*|*"vite build"*)
    filter_mode="build"
    ;;
  # Test commands
  *"npm test"*|*"npm run test"*|*"pnpm test"*|*"yarn test"*|*"pytest"*|*"jest"*|*"vitest"*)
    filter_mode="test"
    ;;
  # Other noisy commands
  *"cargo build"*|*"cargo test"*|*"go build"*|*"go test"*|*"mvn install"*|*"gradle build"*)
    filter_mode="build"
    ;;
  # Not a noisy command - pass through
  *)
    filter_mode="none"
    ;;
esac

# If not a noisy command, execute normally
if [ "$filter_mode" = "none" ]; then
  eval "$command"
  exit $?
fi

# For noisy commands, filter the output
eval "$command" 2>&1 | awk '
  BEGIN {
    in_progress = 0
    last_was_empty = 0
  }

  # Skip progress bars and spinner lines
  /^[[:space:]]*\[?[=>\-\.\*#]{3,}/ { next }
  /\[?[0-9]+%\]?/ && /[=>\-\.\*#]/ { next }
  /⠋|⠙|⠹|⠸|⠼|⠴|⠦|⠧|⠇|⠏/ { next }
  /├──|└──|│/ && !/error|fail|warn/i { next }

  # Skip repetitive "fetching" or "downloading" lines
  /^(fetching|downloading|resolving|extracting)/i && !/error|fail/i {
    in_progress = 1
    next
  }

  # Keep error lines
  /error|failed|fatal|exception|traceback/i {
    print
    last_was_empty = 0
    next
  }

  # Keep warning lines
  /warn|warning|deprecated/i {
    print
    last_was_empty = 0
    next
  }

  # Keep summary lines
  /^(success|completed|total|passed|failed|built|installed|added|removed|✓|✔|✗|✘)/i {
    print
    last_was_empty = 0
    next
  }

  # Keep lines with package counts or version info at end
  /^[[:space:]]*[0-9]+ packages?/ || /^[[:space:]]*added [0-9]+/ {
    print
    last_was_empty = 0
    next
  }

  # Keep "Done in" timing lines
  /^Done in [0-9]/ {
    print
    last_was_empty = 0
    next
  }

  # Keep build output summary lines
  /compiled|bundled|webpack|vite|turbopack/i && /successfully|error|in [0-9]/i {
    print
    last_was_empty = 0
    next
  }

  # Keep test result lines
  /^[[:space:]]*(PASS|FAIL|Test Suites|Tests):/ {
    print
    last_was_empty = 0
    next
  }

  # Skip empty lines after another empty line
  /^[[:space:]]*$/ {
    if (last_was_empty == 0) {
      print
      last_was_empty = 1
    }
    next
  }

  # For everything else during progress, skip
  {
    if (in_progress == 0) {
      print
    }
    last_was_empty = 0
  }
'

# Preserve exit code
exit ${PIPESTATUS[0]}
