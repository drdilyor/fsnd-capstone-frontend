<template>
  <!--
    Modal caller should wrap the component with transition:
    <transition name="modal">
      <modal>...</modal>
    </transition>
  -->
    <div class="modal" style="display: block" tabindex="-1" @click="$emit('close')">
      <div class="modal-dialog">
        <div class="modal-content" @click.stop>
          <div class="modal-header" v-if="title">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <slot/>
          </div>
          <div class="modal-footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() { return {
    backdropElem: null,
  } },
  computed: {
    getStyles() {
      return {
        'display': 'block',
      }
    }
  },
  mounted() {
  },
}
</script>

<style>
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-dialog,
.modal-leave-active .modal-dialog {
  transform: translateY(-50px);
}
/* .modal-leave-active .modal-dialog {
  transition-delay: .2s;
} */
.modal-dialog {
  transition: transform .3s ease-out;
  transition-delay: .2s;
}

.modal {
  background: rgba(0, 0, 0, .5);
  transition: opacity .5s linear;
}
.modal.show {
	overflow-x: hidden;
	overflow-y: auto;
}
</style>
