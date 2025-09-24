import { ref, onMounted, onUnmounted } from 'vue'


export interface UseDateCountDownOptions {
    targetDate: Date
}


export const useDateCountDown = (props: UseDateCountDownOptions) => {

    const { targetDate } = props
    const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true })

    const intervalId = ref<NodeJS.Timeout | null>(null);

    function updateCountdown() {
        const now = new Date()

        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) {

            if (intervalId.value) {
                clearInterval(intervalId.value)
            }

            timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
            return
        }

        const seconds = Math.floor((diff / 1000) % 60)
        const minutes = Math.floor((diff / 1000 / 60) % 60)
        const hours = Math.floor((diff / 1000 / 60 / 60) % 24)
        const days = Math.floor(diff / 1000 / 60 / 60 / 24)

        timeLeft.value = { days, hours, minutes, seconds, finished: diff <= 1 }
    }

    onMounted(() => {
        updateCountdown()
        intervalId.value = setInterval(updateCountdown, 1000)
    })

    onUnmounted(() => {
        if (intervalId.value) {
            clearInterval(intervalId.value)
        }
    })

    return timeLeft;
}


