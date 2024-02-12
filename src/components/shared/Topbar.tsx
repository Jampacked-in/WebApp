import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";;
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { BusinessValidation } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "./loader";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {user} = useUserContext();
    const accountId = user.id;

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess, navigate]);

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    const form = useForm<z.infer<typeof BusinessValidation>>({
        resolver: zodResolver(BusinessValidation),
        defaultValues: {
            businessname: '',
            location: '',
        },
    });

    // const onSubmit = async (businessValues: z.infer<typeof BusinessValidation>) => {
    //     setIsCreatingBusiness(true);

    //     const businessData = {
    //         accountId: accountId,
    //         businessId: businessId,
    //         businessname: businessValues.businessname,
    //         location: businessValues.location,
    //     };

    //     try {
    //         const newBusiness = await saveBusinessToDB(businessData);
    //         if (newBusiness) {
    //             toggleDialog();
    //             return toast({
    //                 title: 'Business added successfully.',
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     } finally {
    //         setIsCreatingBusiness(false);
    //     }
    // }

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
