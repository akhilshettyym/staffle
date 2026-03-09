import LoginForm from "../components/LoginForm";

const LoginPage = () => {

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0F1412] gap-4">

            <div className="text-center">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]"> Sign In </h1>
                <p className="mt-2 text-sm text-[#FFDAB3]/70"> Access your organization dashboard </p>
            </div>

            <LoginForm />
        </div>
    );
};

export default LoginPage;