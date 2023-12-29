"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Meeting from "@/components/Meeting";
import BottomWave from "@/components/ui/bottomWave1";
import BottomWave2 from "@/components/ui/bottomWave2";
import PageWrapper from "@/components/PageWrapper";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(3).max(50),
	email: z.string().email(),
	subject: z.string().min(3).max(50),
	message: z.string().min(10).max(500),
});

export default function ContactPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			await fetch("/api/contact/", {
				method: "POST",
				body: JSON.stringify(values),
				headers: {
					"Content-Type": "application/json",
				},
			});
			toast.success("Message sent successfully");
			router.push("/");
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<PageWrapper>
				<div className="mt-20">
					<div className="grid grid-cols-1 md:grid-cols-2 p-5 md:p-20 gap-5 max-md:text-center">
						<div className="flex flex-col gap-10">
							<div className="space-y-2">
								<h2 className="text-2xl md:text-4xl font-bold font-poppins">
									Let&#39;s Work Together
								</h2>
								<p className="opacity-50">
									feel free to reach out!
								</p>
							</div>
							<div className="flex flex-col gap-5 max-md:justify-center">
								<p>Lahore, Pakistan</p>
								<div>
									<Link
										href={
											"https://api.whatsapp.com/send?phone=03074254648"
										}
										className={cn(
											"hover:text-myBlue w-max"
										)}
									>
										+92-307-4254648
									</Link>
								</div>
								<div>
									<Link
										href={
											"mailto:info.iamjunaidjutt@gmail.com"
										}
										className={cn(
											"hover:text-myBlue w-max"
										)}
									>
										info.iamjunaidjutt@gmail.com
									</Link>
								</div>
							</div>
						</div>
						<motion.div
							className="border border-primary rounded-xl shadow-md p-5 md:p-10 text-start glassmorphism"
							initial={{ opacity: 0, x: 100, y: 0 }}
							animate={{ opacity: 1, x: 0, y: 0 }}
							transition={{
								delay: 0.5,
								duration: 1,
								type: "tween",
							}}
						>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-8"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input
															placeholder="Name"
															className="p-4 text-base"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															placeholder="Email address"
															className="p-4 text-base"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name="subject"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Subject</FormLabel>
												<FormControl>
													<Input
														placeholder="Subject"
														className="p-4 text-base"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="message"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea
														rows={5}
														placeholder="Message"
														className="p-4 text-base"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className=" max-md:text-center">
										<Button
											type="submit"
											size={"lg"}
											disabled={isLoading}
										>
											{isLoading ? "Loading..." : "Send"}
										</Button>
									</div>
								</form>
							</Form>
						</motion.div>
					</div>
				</div>

				<BottomWave />
				<Meeting />
				<BottomWave2 />
			</PageWrapper>
		</>
	);
}
