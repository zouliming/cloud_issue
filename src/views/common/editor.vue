<template lang="html">
    <div id="editor" v-html="inputContent" @input="outputContent" style="min-height: 300px;"></div>
</template>

<script>
    import WangEditor from 'wangeditor'
    import { API_URL } from '../../config'
    export default {
        props: ['inputContent'],
        data() {
            return {
                content: '',
                uploadUrl: API_URL + '/Upload/uploadImage'
            }
        },
        computed: {
        },
        mounted() {
            this.createEditor()
        },
        methods: {
            createEditor() {
                const self = this
                const editor = new WangEditor('editor')
                editor.config.menus = ['source', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
                    'link', 'unlink', 'table', 'img', 'video', 'insertcode', 'undo', 'redo', 'fullscreen'
                ]
                editor.config.uploadImgFileName = 'editorFileName'
                editor.config.uploadImgUrl = this.uploadUrl

                editor.onchange = function () {
                    self.formatContent(this.$txt.html())
                }
                editor.create()
            },
            formatContent(content) {
                // handle
                // ...
                this.content = content
                this.outputContent()
            },
            outputContent() {
                this.$emit('input', this.content)
            }
        },
        components: {}
    }

</script>

<style lang="css" scoped>
    .wangEditor-container {
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid #CCC;
    }
</style>