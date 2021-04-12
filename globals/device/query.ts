/**
 * @param { UUID } id device unique ID in DB
 * 
 * @param { String } channel new channel string
 * 
 * @returns {object} {id, channel}
 */
export const updateDeviceChannel =
    `mutation(
    $id: ID!
    $channel: String!
  ) {
    updateHueDevice(
      id: $id
      data: {
        channel: $channel
      }
    ) {
      id
      channel
    }
  }`