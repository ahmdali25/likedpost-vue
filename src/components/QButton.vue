<template>
    <div>
        <q-btn @click="btnClick" flat :color="color" :text-color="textColor" :label="label" />
    </div>
</template>

<script>
export default {
    name: "QButton",
    props: {
        color: {
            type: String,
            default: "primary",
        },
        textColor: {
            type: String,
            default: "white"
        },
        label: {
            type: String,
        }
    },
    emits: ["btnClick"],
}
</script>