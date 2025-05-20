import SideBar from "@/components/SIdeBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen w-full grid grid-cols-[300px_auto]">
            <div className="border-r border-border p-4">
                <SideBar />
            </div>
            <div className="border-l border-border h-full w-full px-12 py-4">
                {children}
            </div>
        </div>
    );
};

export default Layout;
