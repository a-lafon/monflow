import Layout from "@/components/Layout";
import { useState } from "react";
import SearchTracks from "@/components/Search/SearchTrack/SearchTracks";
import { SearchApiResponse } from "./api/search";
import Card from "@/components/Card/Card";
import { motion } from "framer-motion";

const maxTracks = 5;

const Search = () => {
  const [tracks, setTracks] = useState<SearchApiResponse[]>([]);

  const onItemClicked = (item: SearchApiResponse) => {
    if (isFullTracks() || isTrackAlreadyInList(item.id)) {
      return;
    }
    setTracks([...tracks, item]);
  }

  const isFullTracks = () => tracks.length === maxTracks;

  const isTrackAlreadyInList = (id: string) => tracks.find((t) => t.id === id);

  return (
    <Layout>
      <div className="section">
        <div className="container">
          <motion.h1 className="is-size-2 has-text-link has-text-centered has-text-weight-bold">
            Une playlist pour toi !
          </motion.h1>
          <p className="has-text-white is-size-7 has-text-centered has-text-weight-semibold">
            Balance jusqu&apos;à 5 de tes musiques ou artistes préférés
          </p>
          <div className="columns is-centered mt-1">
            <div className="column is-6">
              <SearchTracks onItemClicked={onItemClicked} />
            </div>
          </div>
        </div>
      </div>

      {
        tracks.length >= 1 &&
        <div className="section has-background-white">
          <div className="container">
            <h2 className="is-size-3 has-text-black has-text-weight-bold mb-3">Tes coups de coeur</h2>
            <div className={`columns is-mobile is-multiline ${tracks.length > 3 ? 'is-justify-content-center' : ''}`}>
              {
                tracks.map((track) => (
                  <div className="column is-4" key={`st_${track.type}_${track.id}`}>
                    <motion.div
                      initial={{ y: 50, filter: 'blur(10px)' }}
                      animate={{ y: 0, filter: 'blur(0px)' }}
                      transition={{ ease: "easeOut", duration: .5, type: 'sprint' }}
                    >
                      <Card
                        title={track.name}
                        subtitle={track.artist}
                        image={track.images[0].url}
                      />
                    </motion.div>

                  </div>
                ))
              }
            </div>

            <div className="has-text-right">
              <motion.button
                className="button is-primary is-outlined is-rounded is-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                C&apos;est parti
              </motion.button>
            </div>

          </div>
        </div>
      }
    </Layout>
  )
}

export default Search;
