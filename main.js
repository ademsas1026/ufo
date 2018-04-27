import cluster from 'k-means'
import sightings from './ufo'

const kmeans = (...args) =>
  new Promise(resolve => cluster(...args, resolve))

const pos = sightings.map(
  ({latitude: lat, longitude: lng}, i) => [lat, lng]
)

const NUM_CLUSTERS = 10

const go = async () => {  
  const {finalMatrix, clusterCenters}
    = await kmeans(pos, {
      clusters: NUM_CLUSTERS,
      iterations: 100,
    })

  const clusters = new Array(NUM_CLUSTERS)
    .fill('x')
    .map(x => [])

  sightings.forEach((sighting, i) => {
    const id = finalMatrix[i][0]
    sighting.clusterId = id
    clusters[id].push(sighting)
  })

  console.log(clusters[0])
}

go()
