import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const cartHandler: NextApiHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await import('../../../public/acima_10r.json')

  res.status(200).json(data)
}

export default cartHandler
