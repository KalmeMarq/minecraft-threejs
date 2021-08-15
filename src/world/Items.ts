import BlockItem from "./BlockItem"
import Blocks from "./Blocks"

export default class Items {
  public static BEDROCK: BlockItem
  public static STONE: BlockItem
  public static DIRT: BlockItem
  public static COBBLESTONE: BlockItem
  public static MAGMA: BlockItem
  public static TNT: BlockItem
  public static REDSTONE_BLOCK: BlockItem
  public static OAK_PLANKS_SLAB: BlockItem
  public static RED_CARPET: BlockItem
  public static CACTUS: BlockItem
  public static OAK_LOG: BlockItem
  public static OAK_PLANKS: BlockItem
  public static DARK_OAK_PLANKS: BlockItem
  public static BIRCH_PLANKS: BlockItem
  public static JUNGLE_PLANKS: BlockItem
  public static ACACIA_PLANKS: BlockItem
  public static SPRUCE_PLANKS: BlockItem

  public static OAK_FENCE_GATE: BlockItem
  public static OAK_BUTTON: BlockItem
  public static CAKE: BlockItem
  public static DEEPSLATE_DIAMOND_ORE: BlockItem
  public static DEEPSLATE_EMERALD_ORE: BlockItem
  public static DEEPSLATE_GOLD_ORE: BlockItem
  public static DEEPSLATE_IRON_ORE: BlockItem
  public static DEEPSLATE_REDSTONE_ORE: BlockItem
  public static RED_WOOL: BlockItem
  public static BLACK_WOOL: BlockItem
  public static BLUE_WOOL: BlockItem
  public static BROWN_WOOL: BlockItem
  public static CYAN_WOOL: BlockItem
  public static GRAY_WOOL: BlockItem
  public static GREEN_WOOL: BlockItem
  public static LIGHT_BLUE_WOOL: BlockItem
  public static LIGHT_GRAY_WOOL: BlockItem
  public static LIME_WOOL: BlockItem
  public static MAGENTA_WOOL: BlockItem
  public static ORANGE_WOOL: BlockItem
  public static PINK_WOOL: BlockItem
  public static PURPLE_WOOL: BlockItem
  public static WHITE_WOOL: BlockItem
  public static YELLOW_WOOL: BlockItem
  public static ENCHANTING_TABLE: BlockItem
  public static OAK_DOOR_BOTTOM: BlockItem
  public static TORCH: BlockItem
  public static TERRACOTTA: BlockItem
  public static BLACK_TERRACOTTA: BlockItem
  public static BLUE_TERRACOTTA: BlockItem
  public static BROWN_TERRACOTTA: BlockItem
  public static CYAN_TERRACOTTA: BlockItem
  public static GRAY_TERRACOTTA: BlockItem
  public static GREEN_TERRACOTTA: BlockItem
  public static LIGHT_BLUE_TERRACOTTA: BlockItem
  public static LIGHT_GRAY_TERRACOTTA: BlockItem
  public static LIME_TERRACOTTA: BlockItem
  public static MAGENTA_TERRACOTTA: BlockItem
  public static ORANGE_TERRACOTTA: BlockItem
  public static PINK_TERRACOTTA: BlockItem
  public static PURPLE_TERRACOTTA: BlockItem
  public static RED_TERRACOTTA: BlockItem
  public static WHITE_TERRACOTTA: BlockItem
  public static YELLOW_TERRACOTTA: BlockItem
  public static SAND: BlockItem
  public static GRASS_BLOCK: BlockItem

  private static _init = (() => {
    Items.BEDROCK = new BlockItem(Blocks.BEDROCK, 'assets/textures/block/bedrock.png')
    Items.STONE = new BlockItem(Blocks.STONE, 'assets/textures/block/stone.png')
    Items.DIRT = new BlockItem(Blocks.DIRT, 'assets/textures/block/dirt.png')
    Items.COBBLESTONE = new BlockItem(Blocks.COBBLESTONE, 'assets/textures/block/cobblestone.png')
    Items.MAGMA = new BlockItem(Blocks.MAGMA, 'assets/textures/block/magma.png')
    Items.TNT = new BlockItem(Blocks.TNT, 'assets/textures/block/tnt_side.png')
    Items.REDSTONE_BLOCK = new BlockItem(Blocks.REDSTONE_BLOCK, 'assets/textures/block/redstone_block.png')
    Items.OAK_PLANKS_SLAB = new BlockItem(Blocks.OAK_PLANKS_SLAB, 'assets/textures/block/oak_planks.png')
    Items.RED_CARPET = new BlockItem(Blocks.RED_CARPET, 'assets/textures/block/red_wool.png')
    Items.CACTUS = new BlockItem(Blocks.CACTUS, 'assets/textures/block/cactus_side.png')
    Items.OAK_LOG = new BlockItem(Blocks.OAK_LOG, 'assets/textures/block/oak_log.png')
    Items.OAK_PLANKS = new BlockItem(Blocks.OAK_PLANKS, 'assets/textures/block/oak_planks.png')
    Items.DARK_OAK_PLANKS = new BlockItem(Blocks.DARK_OAK_PLANKS, 'assets/textures/block/dark_oak_planks.png')
    Items.BIRCH_PLANKS = new BlockItem(Blocks.BIRCH_PLANKS, 'assets/textures/block/birch_planks.png')
    Items.JUNGLE_PLANKS = new BlockItem(Blocks.JUNGLE_PLANKS, 'assets/textures/block/jungle_planks.png')
    Items.ACACIA_PLANKS = new BlockItem(Blocks.ACACIA_PLANKS, 'assets/textures/block/acacia_planks.png')
    Items.SPRUCE_PLANKS = new BlockItem(Blocks.SPRUCE_PLANKS, 'assets/textures/block/spruce_planks.png')
    
    Items.OAK_FENCE_GATE = new BlockItem(Blocks.OAK_FENCE_GATE, 'assets/textures/block/oak_planks.png')
    Items.OAK_BUTTON = new BlockItem(Blocks.OAK_BUTTON, 'assets/textures/block/oak_planks.png')
    Items.CAKE = new BlockItem(Blocks.CAKE, 'assets/textures/block/cake_side.png')
    Items.DEEPSLATE_DIAMOND_ORE = new BlockItem(Blocks.DEEPSLATE_DIAMOND_ORE, 'assets/textures/block/deepslate_diamond_ore.png')
    Items.DEEPSLATE_EMERALD_ORE = new BlockItem(Blocks.DEEPSLATE_EMERALD_ORE, 'assets/textures/block/deepslate_emerald_ore.png')
    Items.DEEPSLATE_GOLD_ORE = new BlockItem(Blocks.DEEPSLATE_GOLD_ORE, 'assets/textures/block/deepslate_gold_ore.png')
    Items.DEEPSLATE_IRON_ORE = new BlockItem(Blocks.DEEPSLATE_IRON_ORE, 'assets/textures/block/deepslate_iron_ore.png')
    Items.DEEPSLATE_REDSTONE_ORE = new BlockItem(Blocks.DEEPSLATE_REDSTONE_ORE, 'assets/textures/block/deepslate_redstone_ore.png')
    Items.RED_WOOL = new BlockItem(Blocks.RED_WOOL, 'assets/textures/block/red_wool.png')
    Items.BLACK_WOOL = new BlockItem(Blocks.BLACK_WOOL, 'assets/textures/block/black_wool.png')
    Items.BLUE_WOOL = new BlockItem(Blocks.BLUE_WOOL, 'assets/textures/block/blue_wool.png')
    Items.BROWN_WOOL = new BlockItem(Blocks.BROWN_WOOL, 'assets/textures/block/brown_wool.png')
    Items.CYAN_WOOL = new BlockItem(Blocks.CYAN_WOOL, 'assets/textures/block/cyan_wool.png')
    Items.GRAY_WOOL = new BlockItem(Blocks.GRAY_WOOL, 'assets/textures/block/gray_wool.png')
    Items.GREEN_WOOL = new BlockItem(Blocks.GREEN_WOOL, 'assets/textures/block/green_wool.png')
    Items.LIGHT_BLUE_WOOL = new BlockItem(Blocks.LIGHT_BLUE_WOOL, 'assets/textures/block/light_blue_wool.png')
    Items.LIGHT_GRAY_WOOL = new BlockItem(Blocks.LIGHT_GRAY_WOOL, 'assets/textures/block/light_gray_wool.png')
    Items.LIME_WOOL = new BlockItem(Blocks.LIME_WOOL, 'assets/textures/block/lime_wool.png')
    Items.MAGENTA_WOOL = new BlockItem(Blocks.MAGENTA_WOOL, 'assets/textures/block/magenta_wool.png')
    Items.ORANGE_WOOL = new BlockItem(Blocks.ORANGE_WOOL, 'assets/textures/block/orange_wool.png')
    Items.PINK_WOOL = new BlockItem(Blocks.PINK_WOOL, 'assets/textures/block/pink_wool.png')
    Items.PURPLE_WOOL = new BlockItem(Blocks.PURPLE_WOOL, 'assets/textures/block/purple_wool.png')
    Items.WHITE_WOOL = new BlockItem(Blocks.WHITE_WOOL, 'assets/textures/block/white_wool.png')
    Items.YELLOW_WOOL = new BlockItem(Blocks.YELLOW_WOOL, 'assets/textures/block/yellow_wool.png')
    Items.ENCHANTING_TABLE = new BlockItem(Blocks.ENCHANTING_TABLE, 'assets/textures/block/enchanting_table_side.png')
    Items.OAK_DOOR_BOTTOM = new BlockItem(Blocks.OAK_DOOR_BOTTOM, 'assets/textures/block/oak_door_bottom.png')
    Items.TORCH = new BlockItem(Blocks.TORCH, 'assets/textures/block/torch.png')
    Items.TERRACOTTA = new BlockItem(Blocks.TERRACOTTA, 'assets/textures/block/terracotta.png')
    Items.BLACK_TERRACOTTA = new BlockItem(Blocks.BLACK_TERRACOTTA, 'assets/textures/block/black_terracotta.png')
    Items.BLUE_TERRACOTTA = new BlockItem(Blocks.BLUE_TERRACOTTA, 'assets/textures/block/blue_terracotta.png')
    Items.BROWN_TERRACOTTA = new BlockItem(Blocks.BROWN_TERRACOTTA, 'assets/textures/block/brown_terracotta.png')
    Items.CYAN_TERRACOTTA = new BlockItem(Blocks.CYAN_TERRACOTTA, 'assets/textures/block/cyan_terracotta.png')
    Items.GRAY_TERRACOTTA = new BlockItem(Blocks.GRAY_TERRACOTTA, 'assets/textures/block/gray_terracotta.png')
    Items.GREEN_TERRACOTTA = new BlockItem(Blocks.GREEN_TERRACOTTA, 'assets/textures/block/green_terracotta.png')
    Items.LIGHT_BLUE_TERRACOTTA = new BlockItem(Blocks.LIGHT_BLUE_TERRACOTTA, 'assets/textures/block/light_blue_terracotta.png')
    Items.LIGHT_GRAY_TERRACOTTA = new BlockItem(Blocks.LIGHT_GRAY_TERRACOTTA, 'assets/textures/block/light_gray_terracotta.png')
    Items.LIME_TERRACOTTA = new BlockItem(Blocks.LIME_TERRACOTTA, 'assets/textures/block/lime_terracotta.png')
    Items.MAGENTA_TERRACOTTA = new BlockItem(Blocks.MAGENTA_TERRACOTTA, 'assets/textures/block/magenta_terracotta.png')
    Items.ORANGE_TERRACOTTA = new BlockItem(Blocks.ORANGE_TERRACOTTA, 'assets/textures/block/orange_terracotta.png')
    Items.PINK_TERRACOTTA = new BlockItem(Blocks.PINK_TERRACOTTA, 'assets/textures/block/pink_terracotta.png')
    Items.PURPLE_TERRACOTTA = new BlockItem(Blocks.PURPLE_TERRACOTTA, 'assets/textures/block/purple_terracotta.png')
    Items.RED_TERRACOTTA = new BlockItem(Blocks.RED_TERRACOTTA, 'assets/textures/block/red_terracotta.png')
    Items.WHITE_TERRACOTTA = new BlockItem(Blocks.WHITE_TERRACOTTA, 'assets/textures/block/white_terracotta.png')
    Items.YELLOW_TERRACOTTA = new BlockItem(Blocks.YELLOW_TERRACOTTA, 'assets/textures/block/yellow_terracotta.png')
    Items.SAND = new BlockItem(Blocks.SAND, 'assets/textures/block/sand.png')
    Items.GRASS_BLOCK = new BlockItem(Blocks.GRASS_BLOCK, 'assets/textures/block/grass_block_side.png')
  })()
}