export const cleanAssistantText = (content: string): string =>
	content
		.replace(/\r\n/g, "\n")
		.replace(/[   -   　]/g, " ")
		.replace(/[​-‍⁠﻿]/g, "")
		.replace(/(\d)\s?×/g, "$1x")
		.replace(/([^\n])\n(#{1,6} )/g, "$1\n\n$2")
		.replace(/\n{3,}/g, "\n\n");
