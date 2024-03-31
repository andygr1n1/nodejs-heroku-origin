import { gql } from 'graphql-request'
import { generateClient } from '../../../../api/client.js'
import { subDays } from 'date-fns'

export const destroyDeletedDataMutation = async () => {
    try {
        const client = generateClient()
        if (!client) throw new Error('generate client error')

        const lte = subDays(new Date(Date.now()), 30)
        const mutation = gql`
            mutation destroyDeletedDataMutation($lte: timestamptz) {
                delete_goals(where: { deleted_at: { _lte: $lte } }) {
                    affected_rows
                }
                delete_sprints(where: { deleted_at: { _lte: $lte } }) {
                    affected_rows
                }
                delete_notes(where: { deleted_at: { _lte: $lte } }) {
                    affected_rows
                }
            }
        `

        const response = await client.request(mutation, {
            lte,
        })

        return response
    } catch (e) {
        console.error('destroyDeletedDataMutation', e)
        return
    }
}
