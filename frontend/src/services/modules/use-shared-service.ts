import { ref } from 'vue'
import { GlobalLoading, GlobalError, UseSharedService } from '@/services/interfaces/modules/shared-service'

const isGlobalLoading: GlobalLoading = ref(false)
const isGlobalError: GlobalError = ref(null)

const setGlobalError = (error: Error | null) => {
  isGlobalError.value = error
}

const setGlobalLoading = (isLoading: boolean) => {
  isGlobalLoading.value = isLoading
}

export const useSharedService = (): UseSharedService => {
  return {
    isGlobalLoading,
    isGlobalError,
    methodsSharedService: {
      setGlobalError,
      setGlobalLoading
    }
  }
}
