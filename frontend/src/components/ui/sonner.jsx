import { Toaster as SonnerToaster } from 'sonner'

export function Toaster(props) {
  return (
    <SonnerToaster
      theme="dark"
      position="bottom-right"
      richColors={true}
      closeButton={true}
      {...props}
    />
  )
}

export default Toaster
