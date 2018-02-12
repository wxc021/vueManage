<template>
    <div class="edit-div"
         v-html="innerText"
         :contenteditable="canEdit"
         @click="test"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>
<script>
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: Object,
                default: function() {
                  return { value: '', index: 0}
                }
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                innerText: this.value['value'],
                isLocked: false
            }
        },
        watch: {
            'value'() {
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value['value'];
                }
            }
        },
        methods: {
            test(ev) {
                // this.isLocked = true;
                this.canEdit = true;
                this.$nextTick(function() {
                  ev.srcElement.focus();  

                })
            },
            changeText() {
                this.$emit('setValue', {value: this.$el.innerHTML, index: this.value['index']});
            }
        },
        mounted() {
            console.log(this.value)
        }
    }
</script>
<style>
    .edit-div {
        width: 100%;
        height: 100%;
    }
</style>
