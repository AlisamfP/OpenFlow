"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Tab,
    Tabs,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import SettingsPanel from "@/components/Settings";
import { useTheme } from "@mui/material/styles";

function SignInForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await authClient.signIn.email({ email, password });

        setLoading(false);

        if (error) {
            setError(error.message || "Something went wrong");
            return;
        }

        router.push("/");
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();
    const handleMouseUpPassword = (e: React.MouseEvent) => e.preventDefault();


    return (
        <form onSubmit={handleSignIn}>
            <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontSize: '2.5rem' }}>Sign In</Typography>
                <Typography sx={{ fontSize: '1.25rem' }}>Enter your email below to log in to your account</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                <FormControl variant="outlined" required fullWidth>
                    <InputLabel htmlFor="signin-password">Password</InputLabel>
                    <OutlinedInput
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <PiEyeSlash /> : <PiEye />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </Box>
        </form>
    );
}

function SignUpForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();
    const handleMouseUpPassword = (e: React.MouseEvent) => e.preventDefault();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await authClient.signUp.email({
            email,
            password,
            name: email,
        });

        setLoading(false);

        if (error) {
            setError(error.message || "Something went wrong");
            return;
        }

        router.push("/");
    };

    return (
        <form onSubmit={handleSignUp}>
            <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontSize: '2.5rem' }}>Create Account</Typography>
                <Typography sx={{ fontSize: '1.25rem' }}>Enter your email below to create an account</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                <FormControl variant="outlined" required fullWidth>
                    <InputLabel htmlFor="signup-password">Password</InputLabel>
                    <OutlinedInput
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <PiEyeSlash /> : <PiEye />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
            </Box>
        </form>
    );
}

function AuthForms() {
    const [tab, setTab] = useState(0);

    return (
        <Box>
            <Tabs
                value={tab}
                onChange={(_e, newValue) => setTab(newValue)}
                indicatorColor="secondary"
                textColor="inherit"
            >
                <Tab label="Sign In" />
                <Tab label="Create Account" />
            </Tabs>
            {tab === 0 ? <SignInForm /> : <SignUpForm />}
        </Box>
    );
}

function AccountInfo() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const theme = useTheme();
    const responsiveDivider = useMediaQuery(theme.breakpoints.down("md")) 
        ? (<Divider orientation="horizontal" sx={{ mt: "1rem" }} flexItem aria-hidden="true" />) 
        : (<Divider orientation="vertical" sx={{ mt: "-20px" }} flexItem aria-hidden="true" />)

    return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 6, md: 4 } }}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2, 
                width: { xs: "100%", md: "25%" }, 
                position: { md: "sticky" }, 
                top: { md: "100px" }, 
                alignSelf: { md: "flex-start"}, 
                height: { md: "fit-content" }
            }}>
                <Typography variant="h4">Account</Typography>
                <Typography color="text.secondary">email: {session?.user.email}</Typography>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => authClient.signOut().then(() => router.push("/"))}
                    size="large"
                >
                    Sign Out
                </Button>
            </Box>
            {responsiveDivider}
            <SettingsPanel />
        </Box>

    );
}

export default function AccountPage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <Container>
                <Box sx={{ mt: 8 }}>
                    <Typography>Loading...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ mt: 8 }}>
                {session ? <AccountInfo /> : <AuthForms />}
            </Box>
        </Container>
    );
}