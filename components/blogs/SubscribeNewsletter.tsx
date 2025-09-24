'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  subscriberSchema,
  SubscriberFormData
} from '@/lib/schema/fullSubscriber';
import { toast } from 'react-hot-toast';
import { ChevronRight, LoaderIcon} from 'lucide-react';

export default function SubscribeNewsletter() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SubscriberFormData>({
    resolver: zodResolver(subscriberSchema)
  });

  const onSubmit = async (data: SubscriberFormData) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/subscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        toast.success(result.message);
        reset();
      } else {
        setStatus('error');
        toast.error(result.message || 'An error occurred');
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setStatus('error');
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="mt-4 hidden rounded-lg border border-[#c1dbf7] bg-[#e7f0f9] p-6 shadow-md dark:text-black md:block">
      <p className="mb-4 flex items-center text-xl font-semibold">
        {/* <Mail className="mr-2" /> */}
        Subscribe to Our Newsletter
      </p>
      <p className="mb-4 text-sm text-gray-600 ">
        Stay updated with our latest blog posts and news.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            {...register('names')}
            className="w-full  border-gray-300 bg-white text-black dark:border-gray-300 dark:bg-white dark:text-black"
          />
          {errors.names && (
            <p className="mt-1 text-xs text-red-500">{errors.names.message}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            {...register('email')}
            className="w-full  border-gray-300 bg-white text-black dark:border-gray-300 dark:bg-white dark:text-black"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          effect="shineHover"
          className="w-full dark:text-white"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              Subscribing
              <LoaderIcon className="mr-0 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Subscribe
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      {status === 'success' && (
        <p className="mt-4 text-green-600 dark:text-green-400">
          Thank you for subscribing!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600 dark:text-red-400">
          An error occurred. Please try again.
        </p>
      )}
    </div>
  );
}
