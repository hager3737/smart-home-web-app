import TopNavigation from "@/components/TopNavigation";


export default async function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    
    return( 
            <div className="dark:bg-black min-h-screen bg-stone-500">
                <div className="flex flex-col">
                    <div className="pb-14">
                        <TopNavigation/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>  
            </div>
    );

  }