import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const cartHandler: NextApiHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const over = await import('../../../public/acima_10r.json')
  const bellow = await import('../../../public/abaixo_10r.json')

  const data = {
    over,
    bellow,
  }

  res.status(200).json(data)
}

export default cartHandler
