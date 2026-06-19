"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
	LucideIcon,
	PlusIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

type ContactInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon;
	label: string;
	value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
	// Content props
	title?: string;
	description?: string;
	contactInfo?: ContactInfoProps[];
	locationMap?: React.ReactNode;
	formSectionClassName?: string;
};

export function ContactCard({
	title = 'Contact With Us',
	description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
	contactInfo,
	locationMap,
	className,
	formSectionClassName,
	children,
}: ContactCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className={cn(
				'bg-white border border-slate-200 relative grid h-full w-full shadow-xl md:grid-cols-2 lg:grid-cols-3 rounded-xl overflow-hidden',
				className,
			)}
		>
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-slate-300" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-slate-300" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-slate-300" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-slate-300" />
			<div className="flex flex-col justify-between lg:col-span-2">
				<div className="relative h-full space-y-4 px-4 py-8 md:p-8">
					<motion.h1
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-3xl font-bold md:text-4xl lg:text-5xl text-slate-900 font-mono tracking-wide"
					>
						{title}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="text-slate-400 max-w-xl text-sm md:text-base lg:text-lg"
					>
						{description}
					</motion.p>
					<div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 pt-6">
						{contactInfo?.map((info, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
							>
								<ContactInfo {...info} />
							</motion.div>
						))}
					</div>
					{locationMap && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.7 }}
							className="pt-6 flex justify-start"
						>
							{locationMap}
						</motion.div>
					)}
				</div>
			</div>
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.4 }}
				className={cn(
					'bg-slate-50 flex h-full w-full items-center border-t border-slate-200 p-6 md:p-10 md:col-span-1 md:border-t-0 md:border-l',
					formSectionClassName,
				)}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

function ContactInfo({
	icon: Icon,
	label,
	value,
	className,
	...props
}: ContactInfoProps) {
	return (
		<div className={cn('flex items-center gap-3 py-3', className)} {...props}>
			<div className="bg-slate-100 rounded-lg p-3">
				<Icon className="h-5 w-5 text-rose-500" />
			</div>
			<div>
				<p className="font-medium text-slate-900">{label}</p>
				<p className="text-slate-400 text-xs">{value}</p>
			</div>
		</div>
	);
}
