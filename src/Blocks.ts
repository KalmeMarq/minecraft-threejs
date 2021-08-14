import Block from "./Block"
import SoundType from "./sound/SoundType"

export default class Blocks {
  public static BEDROCK: Block
  public static STONE: Block
  public static DIRT: Block
  public static COBBLESTONE: Block
  public static MAGMA: Block
  public static TNT: Block
  public static REDSTONE_BLOCK: Block
  public static OAK_PLANKS_SLAB: Block
  public static RED_CARPET: Block
  public static CACTUS: Block
  public static OAK_LOG: Block
  public static OAK_PLANKS: Block
  public static DARK_OAK_PLANKS: Block
  public static BIRCH_PLANKS: Block
  public static JUNGLE_PLANKS: Block
  public static ACACIA_PLANKS: Block
  public static SPRUCE_PLANKS: Block

  public static OAK_FENCE_GATE: Block
  public static OAK_BUTTON: Block
  public static CAKE: Block
  public static DEEPSLATE_DIAMOND_ORE: Block
  public static DEEPSLATE_EMERALD_ORE: Block
  public static DEEPSLATE_GOLD_ORE: Block
  public static DEEPSLATE_IRON_ORE: Block
  public static DEEPSLATE_REDSTONE_ORE: Block
  public static RED_WOOL: Block
  public static BLACK_WOOL: Block
  public static BLUE_WOOL: Block
  public static BROWN_WOOL: Block
  public static CYAN_WOOL: Block
  public static GRAY_WOOL: Block
  public static GREEN_WOOL: Block
  public static LIGHT_BLUE_WOOL: Block
  public static LIGHT_GRAY_WOOL: Block
  public static LIME_WOOL: Block
  public static MAGENTA_WOOL: Block
  public static ORANGE_WOOL: Block
  public static PINK_WOOL: Block
  public static PURPLE_WOOL: Block
  public static WHITE_WOOL: Block
  public static YELLOW_WOOL: Block
  public static ENCHANTING_TABLE: Block
  public static OAK_DOOR_BOTTOM: Block
  public static TORCH: Block
  public static TERRACOTTA: Block
  public static BLACK_TERRACOTTA: Block
  public static BLUE_TERRACOTTA: Block
  public static BROWN_TERRACOTTA: Block
  public static CYAN_TERRACOTTA: Block
  public static GRAY_TERRACOTTA: Block
  public static GREEN_TERRACOTTA: Block
  public static LIGHT_BLUE_TERRACOTTA: Block
  public static LIGHT_GRAY_TERRACOTTA: Block
  public static LIME_TERRACOTTA: Block
  public static MAGENTA_TERRACOTTA: Block
  public static ORANGE_TERRACOTTA: Block
  public static PINK_TERRACOTTA: Block
  public static PURPLE_TERRACOTTA: Block
  public static RED_TERRACOTTA: Block
  public static WHITE_TERRACOTTA: Block
  public static YELLOW_TERRACOTTA: Block
  public static SAND: Block


  private static _init = (() => {
    Blocks.BEDROCK = new Block(1, 'bedrock', SoundType.NETHERRACK)
    Blocks.STONE = new Block(2, 'stone', SoundType.STONE)
    Blocks.DIRT = new Block(3, 'dirt', SoundType.GRASS)
    Blocks.COBBLESTONE = new Block(4, 'cobblestone', SoundType.STONE)
    Blocks.MAGMA = new Block(5, 'magma', SoundType.STONE)
    Blocks.TNT = new Block(6, 'tnt', SoundType.GRASS)
    Blocks.REDSTONE_BLOCK = new Block(7, 'redstone_block', SoundType.STONE)
    Blocks.OAK_PLANKS_SLAB = new Block(8, 'oak_planks_slab', SoundType.WOOD)
    Blocks.RED_CARPET = new Block(9, 'red_carpet', SoundType.WOOL)
    Blocks.CACTUS = new Block(10, 'cactus', SoundType.GRASS)
    Blocks.OAK_LOG = new Block(11, 'oak_log', SoundType.WOOD)
    Blocks.OAK_PLANKS = new Block(12, 'oak_planks', SoundType.WOOD)
    Blocks.DARK_OAK_PLANKS = new Block(13, 'dark_oak_planks', SoundType.WOOD)
    Blocks.BIRCH_PLANKS = new Block(14, 'birch_planks', SoundType.WOOD)
    Blocks.JUNGLE_PLANKS = new Block(15, 'jungle_planks', SoundType.WOOD)
    Blocks.ACACIA_PLANKS = new Block(16, 'acacia_planks', SoundType.WOOD)
    Blocks.SPRUCE_PLANKS = new Block(17, 'spruce_planks', SoundType.WOOD)

    Blocks.OAK_FENCE_GATE = new Block(19, 'oak_fence_gate', SoundType.WOOD)
    Blocks.OAK_BUTTON = new Block(20, 'oak_button', SoundType.WOOD)
    Blocks.CAKE = new Block(21, 'cake', SoundType.STONE)
    Blocks.DEEPSLATE_DIAMOND_ORE = new Block(22, 'deepslate_diamond_ore', SoundType.STONE)
    Blocks.DEEPSLATE_EMERALD_ORE = new Block(23, 'deepslate_emerald_ore', SoundType.STONE)
    Blocks.DEEPSLATE_GOLD_ORE = new Block(24, 'deepslate_gold_ore', SoundType.STONE)
    Blocks.DEEPSLATE_IRON_ORE = new Block(25, 'deepslate_iron_ore', SoundType.STONE)
    Blocks.DEEPSLATE_REDSTONE_ORE = new Block(26, 'deepslate_redstone_ore', SoundType.STONE)
    Blocks.RED_WOOL = new Block(27, 'red_wool', SoundType.WOOL)
    Blocks.BLACK_WOOL = new Block(28, 'black_wool', SoundType.WOOL)
    Blocks.BLUE_WOOL = new Block(29, 'blue_wool', SoundType.WOOL)
    Blocks.BROWN_WOOL = new Block(30, 'brown_wool', SoundType.WOOL)
    Blocks.CYAN_WOOL = new Block(31, 'cyan_wool', SoundType.WOOL)
    Blocks.GRAY_WOOL = new Block(32, 'gray_wool', SoundType.WOOL)
    Blocks.GREEN_WOOL = new Block(33, 'green_wool', SoundType.WOOL)
    Blocks.LIGHT_BLUE_WOOL = new Block(34, 'light_blue_wool', SoundType.WOOL)
    Blocks.LIGHT_GRAY_WOOL = new Block(35, 'light_gray_wool', SoundType.WOOL)
    Blocks.LIME_WOOL = new Block(36, 'lime_wool', SoundType.WOOL)
    Blocks.MAGENTA_WOOL = new Block(37, 'magenta_wool', SoundType.WOOL)
    Blocks.ORANGE_WOOL = new Block(38, 'orange_wool', SoundType.WOOL)
    Blocks.PINK_WOOL = new Block(39, 'pink_wool', SoundType.WOOL)
    Blocks.PURPLE_WOOL = new Block(40, 'purple_wool', SoundType.WOOL)
    Blocks.WHITE_WOOL = new Block(41, 'white_wool', SoundType.WOOL)
    Blocks.YELLOW_WOOL = new Block(42, 'yellow_wool', SoundType.WOOL)
    Blocks.ENCHANTING_TABLE = new Block(43, 'enchanting_table', SoundType.STONE)
    Blocks.OAK_DOOR_BOTTOM = new Block(44, 'oak_door_bottom', SoundType.WOOD)
    Blocks.TORCH = new Block(45, 'torch', SoundType.WOOD)
    Blocks.TERRACOTTA = new Block(46, 'terracotta', SoundType.STONE)
    Blocks.BLACK_TERRACOTTA = new Block(47, 'black_terracotta', SoundType.STONE)
    Blocks.BLUE_TERRACOTTA = new Block(48, 'blue_terracotta', SoundType.STONE)
    Blocks.BROWN_TERRACOTTA = new Block(49, 'brown_terracotta', SoundType.STONE)
    Blocks.CYAN_TERRACOTTA = new Block(50, 'cyan_terracotta', SoundType.STONE)
    Blocks.GRAY_TERRACOTTA = new Block(51, 'gray_terracotta', SoundType.STONE)
    Blocks.GREEN_TERRACOTTA = new Block(52, 'green_terracotta', SoundType.STONE)
    Blocks.LIGHT_BLUE_TERRACOTTA = new Block(53, 'light_blue_terracotta', SoundType.STONE)
    Blocks.LIGHT_GRAY_TERRACOTTA = new Block(54, 'light_gray_terracotta', SoundType.STONE)
    Blocks.LIME_TERRACOTTA = new Block(55, 'lime_terracotta', SoundType.STONE)
    Blocks.MAGENTA_TERRACOTTA = new Block(56, 'magenta_terracotta', SoundType.STONE)
    Blocks.ORANGE_TERRACOTTA = new Block(57, 'orange_terracotta', SoundType.STONE)
    Blocks.PINK_TERRACOTTA = new Block(58, 'pink_terracotta', SoundType.STONE)
    Blocks.PURPLE_TERRACOTTA = new Block(59, 'purple_terracotta', SoundType.STONE)
    Blocks.RED_TERRACOTTA = new Block(60, 'red_terracotta', SoundType.STONE)
    Blocks.WHITE_TERRACOTTA = new Block(61, 'white_terracotta', SoundType.STONE)
    Blocks.YELLOW_TERRACOTTA = new Block(62, 'yellow_terracotta', SoundType.STONE)
    Blocks.SAND = new Block(63, 'sand', SoundType.SAND)
  })()
}