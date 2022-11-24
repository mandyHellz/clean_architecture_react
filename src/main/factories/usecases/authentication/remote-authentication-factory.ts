import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { MakeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { Authentication } from '@/domain/usecases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), MakeAxiosHttpClient())
}
