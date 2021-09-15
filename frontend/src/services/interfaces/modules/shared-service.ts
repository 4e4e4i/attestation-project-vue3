import { Ref } from '@/services/interfaces/utils'

type GlobalLoading = Ref<boolean>
type GlobalError = Ref<Error | null>
interface UseSharedService {
  isGlobalLoading: GlobalLoading,
  isGlobalError: GlobalError,
  methodsSharedService: {
    setGlobalError: (error: Error | null) => void,
    setGlobalLoading: (loading: boolean) => void
  }
}

export {
  GlobalLoading,
  GlobalError,
  UseSharedService
}
