import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {

    const { email,
        password,
        setEmail,
        setPassword,
        handleLogin,
        loading
    } = useLogin();

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0F1412] gap-4">

            <div className="text-center">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]">
                    Sign In
                </h1>

                <p className="mt-2 text-sm text-[#FFDAB3]/70">
                    Access your organization dashboard
                </p>
            </div>

            <LoginForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleLogin={handleLogin}
                loading={loading}
            />

        </div>
    );
};

export default LoginPage;