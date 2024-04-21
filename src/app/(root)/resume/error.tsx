'use client'
 
import ErrorHandling from '@/components/shared/ErrorHandling'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return <ErrorHandling onClick={() => reset()} />
}