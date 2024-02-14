import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";;
import { Button } from "@/components/ui/button"
import { toast } from "../ui/use-toast";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
    const { mutate: signOut, } = useSignOutAccount();
    const navigate = useNavigate();

    return (
        <section className="topbar">
            <div className="flex-between py-5 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img src="/assets/images/logo.png" alt="logo" width={130} height={325} />
                </Link>
                <div className="flex gap-4">
                <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                    Sign Out
                </Button>
                </div>
            </div>
        </section>
    );
};

export default Topbar;
