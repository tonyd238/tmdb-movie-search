'use client';
import { FC, Fragment } from 'react';
import { MovieDialogProps } from './types';
import { Dialog, DialogBackdrop, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { useModalContext } from '../search/modal/context';
import { normalizeMovie } from '@/components/movie-dialog/utils/normalize-movie';
import { ModalContent } from '@/components/movie-dialog/content';
import { ModalSkeleton } from '@/components/movie-dialog/skeleton';

export const MovieDialog: FC<MovieDialogProps> = (props) => {
	const { data, setModalOpen, open, updateContext } = useModalContext();

	const handleClose = (): void => {
		setModalOpen(false);
		setTimeout(() => {
			updateContext({
				data: null,
			});
		}, 300);
	};
	return <Dialog {...props} unmount transition open={open} onClose={handleClose} as="div" className="relative z-10 focus:outline-none">
		<Transition show={open} as={Fragment}>
			<TransitionChild
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogBackdrop
					className="fixed inset-0 bg-black/30"
				/>
			</TransitionChild>
		</Transition>
		<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
			<div className="flex min-h-full items-center justify-center p-4">
				<DialogPanel
					transition
					className="w-full max-w-3xl rounded-[15px] bg-white p-4 lg:p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
				>
					{data ? <ModalContent data={normalizeMovie(data)} handleClose={handleClose}/> : <ModalSkeleton/>}
				</DialogPanel>
			</div>
		</div>
	</Dialog>;
};