import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { BusinessValidation } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "./loader";
import { useUserContext } from "@/context/AuthContext";
import { v4 as uuidv4 } from 'uuid';
// import { saveBusinessToDB } from "@/lib/appwrite/api";
import { toast } from "../ui/use-toast";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCreatingBusiness, setIsCreatingBusiness] = useState(false);
    const businessId = uuidv4();
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
                    <Button className="shad-button_ghost" onClick={toggleDialog}>
                        Add A New Business
                    </Button>
                    <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
                        Sign Out
                    </Button>
                </div>
            </div>
            {/* {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px] bg-light-1">
                        <DialogHeader>
                            <DialogTitle className="flex justify-center h3-bold">Add A New Business</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="businessname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" className="shad-input" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" className="shad-input" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" className="border mt-5 mb-0 border-dark-1 hover:bg-orange">
                                {isCreatingBusiness ? (
                                    <div className="flex center gap-2">
                                        <Loader /> Adding Business...
                                    </div>
                                ) : (
                                    <div className="flex center gap-2">
                                        Add Business
                                    </div>
                                )}
                                </Button>
                            </DialogFooter>
                        </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            )} */}
        </section>
    );
};

export default Topbar;
