import { loadGaknimes } from "lib/data"
import { Gaknime } from "lib/types"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"

const ItemPage: NextPage<PageProps> = ({ gaknime }) => {
  const router = useRouter()

  React.useEffect(() => {
    router.push(`/?itemId=${gaknime.id}`, `/item/${gaknime.id}`)
  }, [gaknime.id, router])

  return <div />
}

export default ItemPage

type PageProps = {
  gaknime: Gaknime
}

export const getStaticPaths: GetStaticPaths = async () => {
  const gaknimes = await loadGaknimes()

  return {
    paths: gaknimes.map((x) => `/item/${x.id}`),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps, { id: string }> = async (
  ctx
) => {
  const gaknimes = await loadGaknimes()

  return {
    props: {
      gaknime: gaknimes.find((x) => x.id === parseInt(ctx.params?.id ?? ""))!,
    },
  }
}
