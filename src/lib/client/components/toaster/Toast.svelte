<script lang="ts">
    const { message, type } = $props<{
        message: string,
        type: string
    }>()

    const colorPicker = () => {
        switch(type) {
            case 'error':
                return "alert-error"
            case 'info':
                return "alert-info"
            case 'success':
                'alert-success'
        }
    }
</script>

<div class="toast toast-top toast-start">
  <div class={`alert ${colorPicker()}`}>
    <span>{message}</span>
  </div>
</div>