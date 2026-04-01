"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const { error } = await authClient.signUp.email({
            email,
            password,
            name: email,
        });

        if (error) {
            setError(error.message || "Something went wrong");
            return;
        }

        router.push("/");
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4">Sign Up</Typography>
                <form onSubmit={handleSignUp}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        {error && (
                            <Typography color="error">{error}</Typography>
                        )}
                        <Button type="submit" variant="contained" fullWidth>
                            Sign Up
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}