'use client';

import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import accountApiRequest from '@/apiRequest/account.api';
import { useRouter } from 'next/navigation';
import { useGetMeMutation } from '@/queries/useAccount';
import Cookies from 'js-cookie';
import { UserContext } from '@/context/profileContext';

// Define the form schema based on AccountSchema
const profileFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  bio: z.string().optional(),
  industry: z.string().optional(),
  experience: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  social_links: z
    .object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      website: z.string().optional(),
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileEditPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const me = useGetMeMutation();
  const { setUser } = useContext(UserContext) ?? { setUser: () => {} };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      date_of_birth: '',
      bio: '',
      industry: '',
      experience: '',
      location: '',
      phone: '',
      social_links: {
        linkedin: '',
        github: '',
        twitter: '',
        website: '',
      },
    },
  });

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch current profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await me.mutateAsync();
        if (response && response.payload && response.payload.data) {
          const userData = response.payload.data;
          form.reset({
            username: userData.username || '',
            date_of_birth: userData.date_of_birth
              ? formatDate(userData.date_of_birth)
              : '',
            bio: userData.bio || '',
            industry: userData.industry || '',
            experience: userData.experience || '',
            location: userData.location || '',
            phone: userData.phone || '',
            social_links: {
              linkedin: userData.social_links?.linkedin || '',
              github: userData.social_links?.github || '',
              twitter: userData.social_links?.twitter || '',
              website: userData.social_links?.website || '',
            },
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive',
        });
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');

      const requestData = {
        username: data.username,
        date_of_birth: data.date_of_birth,
        bio: data.bio || null,
        industry: data.industry || null,
        experience: data.experience || null,
        location: data.location || null,
        phone: data.phone || null,
        social_links: data.social_links
          ? {
              linkedin: data.social_links.linkedin || null,
              github: data.social_links.github || null,
              twitter: data.social_links.twitter || null,
              website: data.social_links.website || null,
            }
          : null,
      };

      try {
        if (!token) {
          throw new Error('No access token found');
        }
        const response = (await accountApiRequest.updateMe(
          requestData,
          token
        )) as { payload: { data: any } };

        // Cập nhật state user với dữ liệu mới
        setUser(response.payload.data);

        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        });

        router.replace('/app/profile');
      } catch (apiError: any) {
        console.error('API Error details:', {
          status: apiError.status,
          payload: apiError.payload,
          message: apiError.message,
        });

        toast({
          title: 'Error',
          description: apiError.payload?.message || 'Failed to update profile',
          variant: 'destructive',
        });
        throw apiError;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Technology, Healthcare"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5 years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Social Links</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="social_links.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="social_links.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="social_links.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="social_links.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-website.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
