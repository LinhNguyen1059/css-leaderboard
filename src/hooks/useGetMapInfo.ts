import { useState } from "react";
import useLogsStore from "@/stores/logs";

export default function useGetMapInfo() {
  const [loading, setLoading] = useState(false);

  const setLogsTmpInfoProps = useLogsStore(state => state.setLogsTmpInfoProps);

  const fetchMapInfo = async (mapName: string) => {
    if (!mapName) return;

    setLoading(true);

    try {
      // First, search for maps with the given name
      const searchResponse = await fetch(
        `https://gamebanana.com/apiv11/Util/Search/Results?_sOrder=best_match&_idGameRow=2&_sSearchString=${encodeURIComponent(mapName)}&_csvFields=name%2Cdescription%2Carticle%2Cattribs%2Cstudio%2Cowner%2Ccredits&_nPage=1`
      );

      if (!searchResponse.ok) {
        throw new Error(`Search failed: ${searchResponse.statusText}`);
      }

      const searchResults = await searchResponse.json();

      if (!searchResults || searchResults?._aRecords.length === 0) {
        throw new Error("Map not found");
      }

      const findMap = searchResults._aRecords.find(
        (record: any) => record._sName.toLowerCase() === mapName.toLowerCase()
      );

      if (findMap._sName === mapName) {
        const mapId = findMap._idRow;

        setLogsTmpInfoProps({
          map: findMap._sName,
          mapUrl: `https://gamebanana.com/mods/${mapId}`,
        });
      } else {
        setLogsTmpInfoProps({
          mapUrl: undefined,
        });
      }
    } catch (err) {
      setLogsTmpInfoProps({
        mapUrl: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchMapInfo,
  };
}
