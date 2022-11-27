const SUPPORTED_SYSTEMS = {
  "":""
};

const defaultLoadClockFromActor = ({ actor }) => {
  return {
    progress: actor.getFlag("lancer-clocks-hack", "progress"),
    size: actor.getFlag("lancer-clocks-hack", "size"),
    theme: actor.getFlag("lancer-clocks-hack", "theme")
  };
};

const defaultPersistClockToActor = async ({ clock }) => {
  return {
    flags: {
      "lancer-clocks-hack": {
        progress: clock.progress,
        size: clock.size,
        theme: clock.theme
      }
    }
  };
};

export const getSystemMapping = (id) => {
  const defaultSystemConfig = {
    loadClockFromActor: defaultLoadClockFromActor,
    persistClockToActor: defaultPersistClockToActor
  };

  if (!SUPPORTED_SYSTEMS[id]) {
		return {
		  id,
		  ...defaultSystemConfig,
		  registerSheetOptions: {
			types: (game.data.system?.template?.Actor.types ?? game.data.template.Actor.types)
		  }
		};
  }

  return {
    id,
    ...defaultSystemConfig,
    ...SUPPORTED_SYSTEMS[id]
  };
};
