const AuthPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen w-screen grid place-items-end-safe md:place-items-center bg-secondary">
      <div className="p-5 shadow-lg rounded-t-2xl md:rounded-2xl w-full md:w-sm bg-background">
        {children}
      </div>
    </main>
  );
};

export default AuthPage;
