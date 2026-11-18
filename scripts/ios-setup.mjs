// Registers Glossa as an app that can open books from the Files app
// ("Open in…" / "Share → Glossa") by patching ios/App/App/Info.plist.
// Safe to run many times.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const plist = "ios/App/App/Info.plist";
if (!existsSync(plist)) { console.error(`${plist} not found — run "npx cap add ios" first`); process.exit(1); }
let xml = readFileSync(plist, "utf8");

const MARK = "<!-- glossa:document-types -->";
if (xml.includes(MARK)) { console.log("ios-setup: already configured"); process.exit(0); }

const block = `${MARK}
	<key>CFBundleDocumentTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeName</key><string>Book</string>
			<key>CFBundleTypeRole</key><string>Viewer</string>
			<key>LSHandlerRank</key><string>Alternate</string>
			<key>LSItemContentTypes</key>
			<array>
				<string>com.adobe.pdf</string>
				<string>org.idpf.epub-container</string>
				<string>public.plain-text</string>
				<string>com.glossa.fb2</string>
			</array>
		</dict>
	</array>
	<key>UTImportedTypeDeclarations</key>
	<array>
		<dict>
			<key>UTTypeIdentifier</key><string>com.glossa.fb2</string>
			<key>UTTypeDescription</key><string>FictionBook</string>
			<key>UTTypeConformsTo</key><array><string>public.xml</string><string>public.data</string></array>
			<key>UTTypeTagSpecification</key>
			<dict><key>public.filename-extension</key><array><string>fb2</string></array></dict>
		</dict>
	</array>
	<key>LSSupportsOpeningDocumentsInPlace</key><false/>
	<key>UIFileSharingEnabled</key><false/>
	<key>ITSAppUsesNonExemptEncryption</key><false/>
`;
xml = xml.replace(/<dict>\s*/, m => m + block);
writeFileSync(plist, xml);
console.log("ios-setup: document types added to Info.plist");
