<template>
    <div class="flex flex-col">
        <div class="w-full">
            <img :src="logoImage" alt="walt.id logo" class="h-8 w-auto mx-auto mt-5" />
        </div>
        <div
            class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 lg:bg-white lg:bg-opacity-50">
            <div>
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
                    class="flex items-center justify-center h-14 w-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    <QrCodeIcon aria-hidden="true" class="h-8 w-8" />
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import VerifiableCredentialCard from "~/components/credentials/VerifiableCredentialCard.vue";
import { QrCodeIcon } from "@heroicons/vue/24/outline";
import { useTenant } from "~/composables/tenants";

const tenant = await useTenant().value;
const { logoImage } = tenant;

const walletId = JSON.parse(JSON.stringify((await listWallets()).value)).wallets[0].id;
const { data: credentials, pending, refresh, error } = await useLazyFetch(`/wallet-api/wallet/${walletId}/credentials`);
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
