<template>
    <div class="min-h-full">
        <TransitionRoot :show="sidebarOpen" as="template">
            <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>

                <div class="fixed inset-0 z-40 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-blue-600 pb-4 pt-5">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute right-0 top-0 -mr-12 pt-2">
                                    <button
                                        class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        type="button" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" class="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div class="flex flex-shrink-0 items-center px-4">
                                <img alt="" class="h-14 w-auto" :src="inWalletLogoImage" />
                            </div>

                            <nav aria-label="Sidebar"
                                class="mt-5 h-full flex-shrink-0 divide-y divide-blue-800 overflow-y-auto">
                                <div class="mt-6 pt-6">
                                    <div class="space-y-1 px-2">
                                        <NuxtLink v-for="item in secondaryNavigation" :key="item.name" :to="item.href"
                                            class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-white hover:bg-blue-700 hover:text-white">
                                            <component :is="item.icon" aria-hidden="true"
                                                class="mr-4 h-6 w-6 text-blue-200" />
                                            {{ item.name }}
                                        </NuxtLink>
                                    </div>
                                </div>
                            </nav>
                        </DialogPanel>
                    </TransitionChild>
                    <div aria-hidden="true" class="w-14 flex-shrink-0">
                        <!-- Dummy element to force sidebar to shrink to fit close icon -->
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <div class="flex flex-1 flex-col min-h-screen">
            <main class="flex-1 pb-8">
                <slot />
            </main>

            <hr class="border-t border-gray-200" aria-hidden="true" />
            <nav class="flex justify-between bg-white px-4 py-2" aria-label="Bottom navigation">
                <NuxtLink to="/" class="flex flex-col items-center text-sm text-gray-500 hover:text-gray-900">
                    <HomeIcon aria-hidden="true" class="h-6 w-6" />
                    <span class="mt-1">Home</span>
                </NuxtLink>
                <NuxtLink to="/request" class="flex flex-col items-center text-sm text-gray-500 hover:text-gray-900">
                    <ArchiveBoxIcon aria-hidden="true" class="h-6 w-6" />
                    <span class="mt-1">Request</span>
                </NuxtLink>
                <NuxtLink to="/profile" class="flex flex-col items-center text-sm text-gray-500 hover:text-gray-900">
                    <UserCircleIcon aria-hidden="true" class="h-6 w-6" />
                    <span class="mt-1">Profile</span>
                </NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import {
    ClipboardDocumentListIcon,
    CogIcon,
    FingerPrintIcon,
    GlobeAltIcon,
    HomeIcon,
    KeyIcon, ListBulletIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    XMarkIcon,
    ArchiveBoxIcon,
    UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { useCurrentWallet } from "~/composables/accountWallet";
import { useTenant } from "~/composables/tenants";

const tenant = await (useTenant()).value
const inWalletLogoImage = tenant?.inWalletLogoImage

const currentWallet = useCurrentWallet()

const navigation = [
    {
        name: "",
        items: [
            { name: "Credentials", href: `/wallet/${currentWallet.value}`, icon: HomeIcon },
            { name: "Tokens", href: `/wallet/${currentWallet.value}/settings/tokens`, icon: GlobeAltIcon },
            { name: "DIDs", href: `/wallet/${currentWallet.value}/settings/dids`, icon: FingerPrintIcon },
            { name: "Keys", href: `/wallet/${currentWallet.value}/settings/keys`, icon: KeyIcon },
            { name: "Event log", href: `/wallet/${currentWallet.value}/eventlog`, icon: ClipboardDocumentListIcon },
        ],
    },
];
const secondaryNavigation = [
    { name: "Select wallet", href: "/", icon: ListBulletIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
    { name: "Help", href: "/help", icon: QuestionMarkCircleIcon },
    { name: "Privacy", href: "/help/privacy", icon: ShieldCheckIcon },
];
const sidebarOpen = ref(false);
</script>

<style>
.router-link-exact-active {
    @apply font-semibold;
    @apply bg-blue-500;
    @apply hover:bg-blue-500;
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
