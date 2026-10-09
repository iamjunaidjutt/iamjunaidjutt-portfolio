"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Mail } from "lucide-react";

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
import Meeting from "@/components/Meeting";
import PageWrapper from "@/components/PageWrapper";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PROFILE_DATA } from "@/data/profile";

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
			toast.success("Message sent. Thanks!");
			router.push("/");
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			toast.error("Something went wrong. Please try again, or email me directly.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<PageWrapper>
				<div className="page-width contact-page mt-20">
					<div className="grid grid-cols-1 lg:grid-cols-2 py-5 lg:py-20 gap-8 lg:gap-12 max-lg:text-center">
						<div className="min-w-0 flex flex-col gap-10 max-lg:items-center">
							<div className="space-y-2">
								<h2 className="text-2xl md:text-4xl font-bold font-poppins">
									Get in touch
								</h2>
								<p className="opacity-50">
									Send a message here, or reach me directly below.
								</p>
							</div>
							<div className="flex flex-col gap-5 max-lg:items-center">
								{/* Address */}
								<div className="flex items-center gap-3">
									<MapPin
										size={20}
										strokeWidth={1.8}
										className="shrink-0"
									/>

									<p>
										{PROFILE_DATA.meta.location}
									</p>
								</div>

								{/* WhatsApp */}
								<Link
									href={PROFILE_DATA.contact.whatsappLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-link flex w-fit items-center gap-3 break-words"
								>
									<MessageCircle
										size={20}
										strokeWidth={1.8}
										className="shrink-0"
									/>
									{PROFILE_DATA.contact.phone}
								</Link>

								{/* Email */}
								<Link
									href={`mailto:${PROFILE_DATA.contact.email}`}
									className="text-link flex w-fit items-center gap-3 break-words"
								>
									<Mail
										size={20}
										strokeWidth={1.8}
										className="shrink-0"
									/>

									<span>
										{PROFILE_DATA.contact.email}
									</span>
								</Link>
							</div>
						</div>
						<div className="relative min-w-0 overflow-hidden">
							<div className="absolute -top-12 -right-12 w-64 h-64 bg-coral/15 rounded-full blur-3xl pointer-events-none" />
							<div className="absolute -bottom-10 -left-10 w-48 h-48 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
							<motion.div
								className="contact-form-panel w-full max-w-full max-lg:max-w-xl max-lg:mx-auto rounded-2xl p-6 md:p-10 text-start"
								initial={{ opacity: 0, x: 40, y: 0 }}
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
														<FormLabel>
															Name
														</FormLabel>
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
														<FormLabel>
															Email
														</FormLabel>
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
													<FormLabel>
														Subject
													</FormLabel>
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
													<FormLabel>
														Message
													</FormLabel>
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
												{isLoading
													? "Loading..."
													: "Send"}
											</Button>
										</div>
									</form>
								</Form>
							</motion.div>
						</div>
					</div>
				</div>
				<Meeting />
			</PageWrapper>
		</>
	);
}
