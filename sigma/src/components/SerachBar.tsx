'use client';
import React, { useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { motion, MotionConfig } from 'framer-motion';
import useClickOutside from '@/hooks/useClickOutside';
import useDebounce from '@/hooks/useDebounce';
import { ArrowLeft, Search } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.2,
};

function Button({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      className='relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function ToolbarDynamic({ onSearchChange }: { onSearchChange: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebounce(searchInput, 300); // Debounce input with a delay of 300ms

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentRef, { width, height }] = useMeasure();

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  // Effect to call the onSearchChange callback whenever the debounced value changes
  React.useEffect(() => {
    onSearchChange(debouncedSearchInput);
  }, [debouncedSearchInput, onSearchChange]);

  return (
    <MotionConfig transition={transition}>
              <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
      <div className='relative mt-4' ref={containerRef}>
        <div className='h-fit w-full rounded-xl border border-zinc-950/10 bg-white-200'>
          <motion.div
            animate={{
              width: isOpen ? '300px' : '98px',
            }}
            initial={false}
          >
            <div ref={contentRef} className='overflow-hidden p-2'>
              {!isOpen ? (
                <div className='flex flex-row justify-center items-center'>
                  <Button
                    onClick={() => setIsOpen(true)}
                    ariaLabel='Search notes'
                  >
                    <Search className='h-5 w-5' />
                  </Button>
                </div>
              ) : (
                <div className='flex space-x-2'>
                  <Button onClick={() => setIsOpen(false)} ariaLabel='Back'>
                    <ArrowLeft className='h-5 w-5' />
                  </Button>
                  <div className='relative w-full'>
                    <input
                      className='h-9 w-full rounded-lg text-black-100 font-bold border border-zinc-950/10 bg-transparent p-2 focus:outline-none'
                      autoFocus
                      placeholder='Search notes'
                      value={searchInput}
                      onChange={(ev) => setSearchInput(ev.target.value)}
                    />
                    <div className='absolute right-1 top-0 flex h-full items-center justify-center'></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
