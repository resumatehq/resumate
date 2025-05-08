import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconFidgetSpinner } from '@tabler/icons-react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormSetError } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState, useEffect, useContext } from 'react';
import { LoginBody, LoginBodyType } from '@/schemas/auth.schema';
import { useLoginMutation } from '@/queries/useAuth';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/profileContext';
import { useGetMeMutation } from '@/queries/useAccount';
import { handleErrorApi } from '@/lib/utils';

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const loginMutation = useLoginMutation();
  const me = useGetMeMutation();

  const { setUser } = useContext(UserContext) || {};

  const router = useRouter();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    setIsLoading(true);
    try {
      console.log(data);
      const res = await loginMutation.mutateAsync(data);
      console.log('dang nhap thanh cong', res.payload.data);
      toast({
        description: res.payload.message,
      });
      setUser?.(res.payload.data.user);
      // console.log('user', response.payload.data);
      router.push('/app');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.payload?.message ?? 'Error unknown',
        variant: 'destructive',
      });
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
      <div className="p-8 pb-6">
        <div>
          <Link href="/" aria-label="go home">
            <Logo />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">Login to Resumate</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Login to continue
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => {}}
          >
            {isLoading ? (
              <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285f4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34a853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#fbbc05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#eb4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
            )}{' '}
            Google
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => {}}
          >
            {isLoading ? (
              <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path>
                <path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path>
                <path
                  fill="#00adef"
                  d="M121.663 256.002H0V134.336h121.663z"
                ></path>
                <path
                  fill="#fbbc09"
                  d="M256 256.002H134.335V134.336H256z"
                ></path>
              </svg>
            )}{' '}
            Microsoft
          </Button>
        </div>

        <hr className="my-4 border-dashed" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{Boolean(errors.password?.message)}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage>{Boolean(errors.password?.message)}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </form>
        </Form>
      </div>

      <div className="bg-muted rounded-(--radius) border p-3">
        <p className="text-accent-foreground text-center text-sm">
          Don't have an account ?
          <Button asChild variant="link" className="px-2">
            <Link href="/auth/sign-up">Create account</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
