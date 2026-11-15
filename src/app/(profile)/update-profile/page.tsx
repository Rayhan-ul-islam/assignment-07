
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const UpdateProfileContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <h1>this is update profile</h1>
    </div>
  );
};

const UpdateProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateProfileContent />
    </Suspense>
  );
};

export default UpdateProfilePage;
