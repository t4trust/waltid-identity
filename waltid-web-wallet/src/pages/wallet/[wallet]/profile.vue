<template>
    <CenterMain>
        <p class="text-center font-bold ">{{ user.email }}</p>
        <div class="bg-white rounded-lg shadow-md p-4 mt-4">
            <div class="font-bold text-lg">DID</div>
            <p class="mt-2">Your public Decentralised Identifier (DID) can be openly shared for issuers to issue
                credentials.</p>
            <div class="bg-gray-100 rounded-lg p-4 mt-4">
                <div class="overflow-auto" v-if="dids.length > 0">{{ dids[0].did }}</div>
                <p v-else>No DID available</p>
            </div>
        </div>
    </CenterMain>
</template>

<script setup>
import CenterMain from "~/components/CenterMain.vue";
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const currentWallet = useCurrentWallet()
const dids = ref("");

async function loadDids() {
    const response = await useFetch(`/wallet-api/wallet/${currentWallet.value}/dids`);
    if (response.data.value && Array.isArray(response.data.value)) {
        dids.value = response.data.value;
    } else {
        dids.value = [];
    }
    refreshNuxtData();
}
loadDids();

definePageMeta({
    layout: 'mobile'
});
</script>