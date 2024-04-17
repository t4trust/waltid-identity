<template>
    <div class="min-h-full">
        <div class="flex flex-1 flex-col min-h-screen">
            <div class="w-full">
                <img :src="logoImage" alt="walt.id logo" class="h-8 w-auto mx-auto mt-5" />
            </div>
            <main class="flex-1 pb-8">
                <slot />
            </main>

            <hr class="border-t border-gray-200" aria-hidden="true" />
            <nav class="flex justify-between bg-white px-4 py-2" aria-label="Bottom navigation">
                <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href"
                    class="flex flex-col items-center text-sm text-gray-500 hover:text-gray-900">
                    <component :is="item.icon" class="h-6 w-6" />
                    <span class="mt-1">{{ item.name }}</span>
                </NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    CogIcon,
    HomeIcon,
    ListBulletIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    ArchiveBoxIcon,
    UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { useCurrentWallet } from "~/composables/accountWallet";
import { useTenant } from "~/composables/tenants";

const tenant = await (useTenant()).value as any

const logoImage = tenant?.logoImage
const inWalletLogoImage = tenant?.inWalletLogoImage

const currentWallet = useCurrentWallet()
const navigation = [

    {
        name: "Home",
        href: `/wallet/${currentWallet.value}`,
        icon: HomeIcon,
    },
    {
        name: "Request",
        href: `/wallet/${currentWallet.value}/settings/issuers`,
        icon: ArchiveBoxIcon,
    },
    {
        name: "Profile",
        href: `/wallet/${currentWallet.value}/profile`,
        icon: UserCircleIcon,
    }
];
const secondaryNavigation = [
    { name: "Select wallet", href: "/", icon: ListBulletIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
    { name: "Help", href: "/help", icon: QuestionMarkCircleIcon },
    { name: "Privacy", href: "/help/privacy", icon: ShieldCheckIcon },
];
</script>

<style>
.router-link-exact-active {
    color: #000;
}

.pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 1;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
}

.pwa-toast .message {
    margin-bottom: 8px;
}

.pwa-toast button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
}
</style>
