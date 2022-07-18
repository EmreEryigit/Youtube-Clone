import { Anchor, AppShell, Box, Header, Navbar } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UploadVideo from "../components/UploadVideo";
import { useMe } from "../context/me";
import { useVideo, VideoContextProvider } from "../context/videos";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, refetch } = useMe();

    return (
        <VideoContextProvider>
            <AppShell
                padding="md"
                navbar={
                    <Navbar width={{ base: 10 }} height={500} p="xs">
                        Side Items
                    </Navbar>
                }
                header={
                    <Header height={60} p="xs">
                        <Box>
                            <Box>
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    width="100px"
                                    height="40px"
                                />
                            </Box>

                            {!user && (
                                <>
                                    <Link href="/auth/login" passHref>
                                        <Anchor>Login</Anchor>
                                    </Link>
                                    <Link href="/auth/register" passHref>
                                        <Anchor>Register</Anchor>
                                    </Link>
                                </>
                            )}
                            {user && <UploadVideo />}
                        </Box>
                    </Header>
                }
            >
                {children}
            </AppShell>
        </VideoContextProvider>
    );
};

export default HomePageLayout;
