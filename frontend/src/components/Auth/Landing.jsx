import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Building2 } from "lucide-react";

const landingHighlights = [
  "Create and manage organizations effortlessly",
  "Assign tasks and keep teams aligned",
  "Designed for clarity, control, and confidence",
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0F1412] text-[#FFDAB3]">

      <div className="relative isolate min-h-screen animate-fadeIn">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,218,179,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,218,179,0.08),transparent_30%),linear-gradient(180deg,rgba(255,218,179,0.03),transparent_50%)]" />
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#FFDAB3]/10 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#FFDAB3]/8 blur-3xl animate-float animate-delay-2000" />

        <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <section className="max-w-2xl space-y-6 animate-slideUp">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFDAB3]/15 bg-[#FFDAB3]/5 px-4 py-2 text-xs font-medium tracking-[0.24em] text-[#FFDAB3]/80 uppercase backdrop-blur-sm hover:scale-[1.03] transition-transform duration-300">
                <Sparkles className="h-4 w-4 animate-pulse" /> Staffle for modern teams
              </div>

              <h1 className="mt-6 text-5xl font-black tracking-tight text-[#FFDAB3] sm:text-6xl lg:text-7xl animate-fadeIn animate-delay-200"> Staffle </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#FFDAB3]/78 sm:text-lg animate-fadeIn animate-delay-400"> All your people. One place. </p>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#FFDAB3]/62 sm:text-base animate-fadeIn animate-delay-600">
                A calm, modern home for employee management — built to help you create
                organizations, assign work, and keep every team in sync with ease.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#FFDAB3]/72">
                {landingHighlights.map((item, idx) => (
                  <div key={item} className="flex items-center gap-2 rounded-full border border-[#FFDAB3]/12 bg-[#FFDAB3]/5 px-4 py-2 backdrop-blur-sm hover:bg-[#FFDAB3]/10 transition-colors duration-300 animate-slideUp animate-delay-[${idx * 100}ms]">
                    <span className="text-[#FFDAB3] font-semibold animate-pulse"> ✔ </span>
                    <span> {item} </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button onClick={() => navigate("/login")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFDAB3] px-7 py-3.5 font-semibold text-[#1B211A] transition-transform duration-200 hover:scale-[1.05] active:scale-[0.98] shadow-lg hover:shadow-[#FFDAB3]/40"> Enter workspace
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button onClick={() => navigate("/create-organization")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FFDAB3]/18 bg-[#FFDAB3]/5 px-7 py-3.5 font-semibold text-[#FFDAB3] backdrop-blur-sm transition-colors duration-200 hover:bg-[#FFDAB3]/10 hover:scale-[1.03]"> New organization
                  <Building2 className="h-4 w-4" />
                </button>
              </div>
            </section>

            <aside className="relative animate-slideUp animate-delay-600">
              <div className="rounded-3xl border border-[#FFDAB3]/12 bg-[#151B18]/85 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 hover:scale-[1.02] transition-transform duration-300 hover:shadow-lg hover:shadow-[#FFDAB3]/30">

                <div className="flex items-center justify-between border-b border-[#FFDAB3]/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#FFDAB3]/50">Organization</p>
                    <h2 className="mt-1 text-xl font-semibold text-[#FFDAB3] transition-colors duration-200 hover:text-[#FFDAB3]/90"> Acme Technologies </h2>
                  </div>
                  <div className="text-xs text-[#FFDAB3]/60"> 24 Employees </div>
                </div>

                <div className="mt-5 grid gap-4">

                  <div className="rounded-2xl border border-[#FFDAB3]/10 bg-[#0F1412] p-4 hover:scale-[1.02] transition-transform duration-200 hover:shadow-lg hover:shadow-[#FFDAB3]/30">
                    <p className="text-sm text-[#FFDAB3]/70"> Departments </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Engineering", "Design", "HR", "Operations", "Finance"].map((dept) => (
                        <span key={dept} className="rounded-full border border-[#FFDAB3]/10 px-3 py-1 text-xs text-[#FFDAB3]/70 hover:bg-[#FFDAB3]/10 transition-colors duration-200"> {dept} </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#FFDAB3]/10 bg-[#0F1412] p-4 hover:scale-[1.02] transition-transform duration-200 hover:shadow-lg hover:shadow-[#FFDAB3]/30">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#FFDAB3]/70"> Recent Employees </p>
                      <span className="text-xs text-[#FFDAB3]/50"> View all </span>
                    </div>

                    <div className="mt-3 space-y-3">
                      {[
                        { name: "Aarav Sharma", role: "Frontend Developer" },
                        { name: "Neha Reddy", role: "HR Manager" },
                        { name: "Kiran Patel", role: "Backend Engineer" },
                      ].map((emp) => (
                        <div key={emp.name} className="flex items-center justify-between rounded-xl border border-[#FFDAB3]/8 px-3 py-2 hover:bg-[#FFDAB3]/10 transition-colors duration-200">
                          <div>
                            <p className="text-sm font-medium text-[#FFDAB3]"> {emp.name} </p>
                            <p className="text-xs text-[#FFDAB3]/55"> {emp.role} </p>
                          </div>
                          <div className="text-xs text-[#FFDAB3]/50 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#FFDAB3] animate-pulse"></span> Active
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#FFDAB3]/10 bg-[#0F1412] p-4 hover:scale-[1.02] transition-transform duration-200 hover:shadow-lg hover:shadow-[#FFDAB3]/30">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#FFDAB3]/70"> Tasks </p>
                      <span className="text-xs text-[#FFDAB3]/50"> 5 active </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {["Prepare onboarding docs", "Update employee roles", "Review leave requests"].map((task) => (
                        <div key={task} className="flex items-center gap-2 text-sm text-[#FFDAB3]/70">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#FFDAB3] animate-pulse" /> {task} </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;