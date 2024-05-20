export default defineAppConfig({
    enableCloudTenants: false,
    localTenant: {
        name : "walt.id GmbH",
        logoImage : "/svg/waltid.svg",
        inWalletLogoImage : "/svg/walt-s.svg",
        bgImage : "/images/start-page-background.png",
        showWaltidLoadingSpinner : true,
    },
    demoTenant: {
        name : "UAE ICP",
        logoImage : "/svg/ica_logo2.svg",
        inWalletLogoImage : "/svg/ica_logo2.svg",
        bgImage : "/images/start-page-background.png",
        showWaltidLoadingSpinner : true,
    },
})
