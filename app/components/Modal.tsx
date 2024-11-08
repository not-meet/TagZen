'use client'
import React, { useState, Fragment, FormEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);




    setIsSubmitting(false);
    setEmail('')
    closeModal()
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Track Button */}
      <button
        onClick={openModal}
        className="btn"
        type="button"
      >
        Track
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-content">
                  <div className='flex flex-col'>
                    <div className='flex justify-between'>
                      <div className='p-3 rounded-10'>
                        <Image src='/assets/icons/logo.svg' alt='logo' width={28} height={28} />
                      </div>
                      <Image src='/assets/icons/x-close.svg' alt='close' width={24} height={24} className='cursor-pointer' onClick={closeModal} />
                    </div>
                    <h4 className='dialog-head_text'>Stay updated with the product prices right into you inbox!</h4>
                    <p className='text-sm text-gray-500 mt-2'>Never miss the bargain again...!</p>
                  </div>
                  <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                    <label htmlFor='Email' className='text-sm font-medium text-gray-400'>Email address..</label>
                    <div className='dialog-input_container'>
                      <Image alt='search' src='/assets/icons/mail.svg' width={18} height={18} />
                      <input required type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email address' className='dialog-input' />
                    </div>
                    <button type='submit' className='dialog-btn'>{isSubmitting ? 'Submiting...' : 'Track'}</button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
