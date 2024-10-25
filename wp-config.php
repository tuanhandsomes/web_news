<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'webtintuc' );

/** Database username */
define( 'DB_USER', 'webtintuc' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Q? +ivD@BR,8#^<q-~q7;9M9[>B %j|^ut[K7GP^nxAF:Heyx76XGg3s`?!b3}hT' );
define( 'SECURE_AUTH_KEY',  'JH},xWlK1MU5S5ZJ0It=,cfO4#)`Xn[wGxtH8boxTHHBN/,|Xm4y#}*TXIT<baZ6' );
define( 'LOGGED_IN_KEY',    'Vx @kk-!.jnC!>TH|($>ZIVS3kxkt5>j.I`T^F33I#tQx(6s3e.rxpyc<JxA8#IX' );
define( 'NONCE_KEY',        '-r$LS%F,S|@+sT_1l8%)9D3E^*H%!X;U[DzbKFd/IfHPtSn(PQBR][{y^}2V*l2s' );
define( 'AUTH_SALT',        'pz5l63F8/;c;?~H]ka:X^?t+/UheG$K}G:grdU]]Ug3%&b|qW:y(DANOA++>:cGO' );
define( 'SECURE_AUTH_SALT', 'FUG2g |A8yc!1~0J3[=+:Mli:(/,n+=hj/:^(qxp`~M}k<|S&Mdbjex^r#vNK(*g' );
define( 'LOGGED_IN_SALT',   '8<9Cm1QfvZMIqL7!Z8:gS{Ia6S6OOjOrn2C@:s303{ve&k`^w2{*o|:OCx[<`Xad' );
define( 'NONCE_SALT',       'E77dTH4`%j@(CH)&7!9s+[|wet7p:emwtiXi^#`MH+*8KgQ^bLS&7:Y<Ycivh05p' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_admin';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
