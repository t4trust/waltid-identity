<template>
    <div
        class="flex flex-1 flex-col justify-center px-4 py-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:bg-white lg:bg-opacity-50">
        <div>
            <p class="text-center font-bold my-2">{{ user.email }}</p>
            <div class="flex flex-1 justify-center mb-3">
                <div
                    class="ml-3 flex-1 bg-white rounded-md p-3 text-center font-bold text-sm border-gray-200 border-solid border-1">
                    CREDENTIALS
                    <div class="text-3xl font-bold bold">{{ credentials?.length || 0 }}</div>
                </div>
                <div
                    class="flex-1 mx-3 bg-white rounded-md p-3 text-center font-bold text-sm border-gray-200 border-solid border-1">
                    EXPIRED
                    <div class="text-3xl font-bold bold">{{ credentials?.filter(c => c.credential?.expirationDate ? new
                        Date(credential?.expirationDate).getTime() > new Date().getTime() : false)?.length || 0 }}</div>
                </div>
            </div>
            <ul v-if="credentials && credentials.length > 0" class="relative grid grid-cols-1 gap-y-4" role="list">
                <li v-for="(credential, index) in credentials" :key="credential.id"
                    :class="{ 'mt-[-85px]': index !== 0 }" class="col-span-1 divide-y divide-gray-200 rounded-2xl bg-white shadow transform hover:scale-105
                        cursor-pointer duration-200">
                    <NuxtLink :to="`/wallet/${walletId}/credentials/` + encodeURIComponent(credential.id)">
                        <VerifiableCredentialCard :credential="credential" />
                    </NuxtLink>
                </li>
            </ul>

            <LoadingIndicator v-else-if="pending">Loading credentials...</LoadingIndicator>

            <div v-else class="text-center">
                <h3 class="text-2xl font-bold text-[#01337D]">No Credentials Yet!</h3>
                <p class="mt-2 text-md text-[#002159]">Start by scanning a <br />credential offer.</p>
            </div>
        </div>
    </div>
    <div class="fixed bottom-20 right-5 lg:hidden">
        <NuxtLink :to="`/wallet/${walletId}/scan`">
            <button
                class="flex items-center justify-center h-14 w-14 rounded-full bg-black text-white shadow-lg hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <img :src="scannerSVG" alt="Scan QR code" class="h-6 w-6" />
            </button>
        </NuxtLink>
    </div>
</template>

<script setup>
import VerifiableCredentialCard from "~/components/credentials/VerifiableCredentialCard.vue";
import scannerSVG from "~/public/svg/scanner.svg";

import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

console.log(user)

const route = useRoute();
const walletId = route.params.wallet;

const { data: credentials, pending, refresh, error } = await useLazyFetch(`/wallet-api/wallet/${walletId}/credentials?showDeleted=false&showPending=false`);
refreshNuxtData();

definePageMeta({
    title: "Wallet dashboard - walt.id",
    layout: "mobile"
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
