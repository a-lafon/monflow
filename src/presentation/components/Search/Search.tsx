import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import SearchClientService from "@/application/SearchClientService";
import { ISearchResponse } from "@/api/interfaces/Search";
import Layout from "../common/Layout";
import Card from "../common/Card/Card";
import SearchTracks from "./SearchTrack/SearchTracks";

const Search = () => {
  const router = useRouter();
  const [tracks, setTracks] = useState<ISearchResponse[]>([]);

  const onItemClicked = (item: ISearchResponse) => {
    if (SearchClientService.isFullTracks(tracks) || SearchClientService.isTrackAlreadyInList(tracks, item.id)) {
      return;
    }
    setTracks([...tracks, item]);
  }

  const goToSwipePage = () => {
    const queryParams = SearchClientService.getQueryParams(tracks);
    router.push(`/swipe${queryParams ? '?' + queryParams : ''}`);
  }

  return (
    <Layout>
      <div className="section">
        <div className="container">
          <h1 className="is-size-2 has-text-link has-text-centered has-text-weight-bold">
            Une playlist pour toi !
          </h1>
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
        <motion.div
          className="section has-background-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: .2 }}
        >
          <div className="container">
            <h2 className="is-size-3 has-text-black has-text-weight-bold mb-3">Tes coups de coeur</h2>
            <div className={`columns is-mobile is-multiline ${tracks.length > 3 ? 'is-justify-content-center' : ''}`}>
              {
                tracks.map((track) => (
                  <div className="column is-4" key={`st_${track.type}_${track.id}`}>
                    <motion.div
                      initial={{ y: 50, filter: 'blur(10px)' }}
                      animate={{ y: 0, filter: 'blur(0px)' }}
                      transition={{ ease: "easeOut", duration: 1, type: 'spring' }}
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
                onClick={goToSwipePage}
              >
                C&apos;est parti
              </motion.button>
            </div>
          </div>
        </motion.div>
      }
    </Layout>
  )
}

export default Search;
